import { Injectable, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDTO } from './user.dto';
import { DatabaseService } from 'src/database/database.service';
import { from, of } from 'rxjs';
import { KafkaService } from 'src/kafka/kafka.service';
import * as jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt'
const bcrypt = require("bcrypt");

@Injectable()
export class UserService implements OnModuleInit {
	private loggerService: Logger
	constructor(
		private httpService: HttpService,
		private databaseService: DatabaseService,
		private kafkaService: KafkaService
	) {
		this.loggerService = new Logger();
	}

	async onModuleInit() {
		try {
			// ----------------- listening on topic update profile user --------------- //
			const consumerProfileUser = this.kafkaService.GetUser('auth-microservice-profile');
			await consumerProfileUser.connect();
			await consumerProfileUser.subscribe({
				topic: 'profile_user',
				fromBeginning: true
			});
			await consumerProfileUser.run({
				eachMessage: async ({ topic, partition, message }) => {
					try {
						this.loggerService.log("receiver topic " + topic);
						const request: {
							dataToUpdated: string,
							id: number,
							steps: string[],
							step_count: number
						} = JSON.parse(message.value as any);
						// update profile
						await this.databaseService.user.update({
							where: {
								id: Number(request.id)
							},
							data: {
								...JSON.parse(request.dataToUpdated)
							}
						});

						// nex step
						const newTopic = request.steps[request.step_count];
						request.step_count = Number(request.step_count) + 1;
						if (newTopic) {
							await this.kafkaService.SendMessage(newTopic, request as any);
							return;
						}
					} catch (err: any) {
						console.log("Failed to listen topic: ", topic)
					}
				}
			});
		} catch (err) {
			this.loggerService.error("An error while init the module auth", err);
		}
	}

	showAll(
		page: number = 1,
		limit: number = 10,
		status: string = undefined,
		order_by: string = 'desc'
	) {
		if (limit < 0 || page < 1) {
			throw new HttpException(
				'Limit or page is invalid',
				HttpStatus.BAD_REQUEST,
			);
		}

		const filterObj = {
			status: status
		};
		let obj = Object.keys(filterObj).length >= 1 ? { ...filterObj } : {}

		return from(this.databaseService.user.findMany({
			where: obj,
			take: Number(limit),
			skip: (Number(page) - 1) * Number(limit),
			orderBy: {
				id: order_by === 'desc' ? 'desc' : 'asc',
			},
		}))
	}
	async register(data: UserDTO) {
		try {
			const { username, password } = data;
			const user = await this.databaseService.user.findUnique({
				where: {
					username: username,
				}
			});
			if (user) {
				throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
			}
			const passHashed = await bcrypt.hash(password, 10)
			const newUser = await this.databaseService.user.create({
				data: {
					username,
					password: passHashed,
					...data
				}
			});
			await this.kafkaService.SendMessage('profile_user', newUser)
			return of({
				user: { ...newUser, password: "" }
			});
		} catch (err: any) {
			console.log(err);
			throw err;
		}
	}

	async login(data: UserDTO) {
		try {
			const { username, password } = data;
			const user = await this.databaseService.user.findUnique({
				where: {
					username: username
				}
			});
			if (!user || !(await bcrypt.compare(password, user.password))) {
				throw new HttpException('This user is not exist', HttpStatus.BAD_REQUEST);
			}

			const token = await jwt.sign({ userId: user.id }, process.env.SECRET_JWT);
			let objRes = Object.assign({
				user,
				token,
			});
		
			return of({
				objRes
			});
		} catch (err: any) {
			throw err;
		}
	}

	async update(id: number, data: UserDTO) {
		try {
			const user = await this.databaseService.user.findUnique({
				where: { id: Number(id) }
			});

			if (!user) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			const updatedUser = await this.databaseService.user.update({
				data: {
					...data,
					password: user.password
				},
				where: {
					id: id
				}
			});

			return updatedUser;
		} catch (err: any) {
			throw err;
		}
	}
	async delete(id: number) {
		try {
			const deletedUser = await this.databaseService.user.delete({
				where: { id: id }
			});

			if (!deletedUser) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			return deletedUser;
		} catch (err: any) {
			throw err;
		}
	}

	async block(id: number) {
		try {
			const blockedUser = await this.databaseService.user.update({
				where: { id: id },
				data: {
					status: 'inactive'
				}
			});
			if (!blockedUser) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			return blockedUser;
		} catch (err: any) {
			console.log(err);
			throw err;
		}
	}
}

