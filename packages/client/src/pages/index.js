import React from "react";
import styles from "@/styles/Home.module.css";
import Home from "./home";
import { useSelector } from "react-redux";

export default function IndexPage() {
	const { auth } = useSelector(state => state);
	return auth.token ? <Home /> : <Login />;
}
