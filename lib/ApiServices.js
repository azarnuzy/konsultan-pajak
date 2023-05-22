import axios from 'axios'
import BaseApiServices from './BaseApiServices'
import Cookies from 'js-cookie'

const getAccessToken = () => {
  return Cookies.get('accessToken')
}

export const getData = async (url, params, onSuccess, onFailed, onFinish) => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  await axios
    .get(`${baseUrl}/${url}`, {
      params: params,
      headers: headers,
    })
    .then((response) => {
      return BaseApiServices.handleSuccess(
        response,
        onSuccess,
        onFailed,
        onFinish
      )
    })
    .catch((error) => {
      return BaseApiServices.handleError(error, onSuccess, onFailed, onFinish)
    })
}

export const postData = async (url, data, onSuccess, onFailed, onFinish) => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  await axios
    .post(`${baseUrl}/${url}`, data, {
      headers: headers,
    })
    .then((response) => {
      return BaseApiServices.handleSuccess(
        response,
        onSuccess,
        onFailed,
        onFinish
      )
    })
    .catch((error) => {
      return BaseApiServices.handleError(error, onSuccess, onFailed, onFinish)
    })
}

export const putData = async (url, data, onSuccess, onFailed, onFinish) => {
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL

  await axios
    .post(`${baseUrl}/${url}`, data, {
      headers: headers,
    })
    .then((response) => {
      return BaseApiServices.handleSuccess(
        response,
        onSuccess,
        onFailed,
        onFinish
      )
    })
    .catch((error) => {
      return BaseApiServices.handleError(error, onSuccess, onFailed, onFinish)
    })
}

export const login = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`

  const res = await axios
    .post(url, data)
    .then((response) => response.data)
    .catch((err) => err.response.data)

  return res
}

export const registerAcc = async (data) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`

  const res = await axios
    .post(url, data)
    .then((response) => response.data)
    .catch((err) => err.response.data)

  return res
}
