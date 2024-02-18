import { Injectable, OnModuleInit, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserDTO } from './dto';
import { DatabaseService } from 'src/database/mongodb/mongoDbDriverConnection';
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

		return []
	}
	async register(data: UserDTO) {
		try {
			const { username, password } = data;
			const user = {};
			if (user) {
				throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
			}
			const passHashed = await bcrypt.hash(password, 10)
			const newUser = {};
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
			const user = {};
			if (!user || !(await bcrypt.compare(password, ""))) {
				throw new HttpException('This user is not exist', HttpStatus.BAD_REQUEST);
			}

			const token = "";
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
			const user = {};

			if (!user) {
				throw new HttpException('This user is not exists', HttpStatus.BAD_REQUEST);
			}

			const updatedUser = {};

			return updatedUser;
		} catch (err: any) {
			throw err;
		}
	}
	async delete(id: number) {
		try {
			const deletedUser = {};

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
			const blockedUser = true;
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

