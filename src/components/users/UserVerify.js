import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "@material-ui/core"
import { ToastContainer, toast } from "react-toastify"
import { Loader } from "react-feather"

const UserVerify = (props) => {
	const initialUser = {
		user: {},
		loading: true,
		error: false,
		errorMessage: "",
	}

	const token = props.location.search

	const [user, setUser] = useState(initialUser.user)
	const [loading, setLoading] = useState(initialUser.loading)
	const [error, setError] = useState(initialUser.error)
	const [errorMessage, setErrorMessage] = useState(initialUser.errorMessage)

	useEffect(() => {
		let config = {
			headers: {
				"Content-Type": "application/json",
			},
		}
		try {
			axios
				.get(
					`${process.env.REACT_APP_API}/api/users/userVerify${token}`,
					config
				)
				.then((user) => {
					setLoading(false)
					setUser(user)
				})
				.catch((err) => {
					toast.error(err.response.data.error, {
						position: toast.POSITION.TOP_RIGHT,
					})
					setError(true)
					setErrorMessage(err.response.data.error)
				})
		} catch (error) {
			toast.error(error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			})
			setError(true)
			setErrorMessage(error.response.data.error)
		}
	}, [])

	if (loading) {
		if (error) {
			return (
				<>
					<ToastContainer />
					<div className="container">
						<p>{errorMessage}</p>
					</div>
				</>
			)
		} else {
			return (
				<Container className="mx-auto w-100 d-flex justify-content-center align-items-center">
					<Loader className="spin" size="42pt" />
				</Container>
			)
		}
	} else {
		const { updateDoc } = user.data
		return (
			<div className="container">
				<h1>
					Thank you for verifying your account,{" "}
					{`${updateDoc.firstName} ${updateDoc.lastName}`}!
				</h1>
			</div>
		)
	}
}

export default UserVerify
