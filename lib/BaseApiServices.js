// eslint-disable-next-line import/no-anonymous-default-export
export default {
  handleSuccess: (response, onSuccess, onFailed, onFinish) => {
    const respData = response.data
    var data = ''
    var message = ''
    var error = {}
    if (typeof respData.message === 'string') {
      message = respData.message
    }
    if (typeof respData.error === 'object') {
      error = respData.error
    }
    if (typeof respData.data === 'object') {
      data = respData.data
    } else {
      data = message
    }
    if (!respData.success) {
      onFailed(message, error)
      return typeof onFinish === 'function' ? onFinish() : null
    }
    onSuccess(data, message)
    return typeof onFinish === 'function' ? onFinish() : null
  },
  handleError: function (error, _onSuccess, onFailed, onFinish) {
    if (
      typeof error.response === 'object' &&
      typeof error.response.data === 'object'
    ) {
      const data = error.response.data
      onFailed(data.message, data.error)
    } else {
    }
    return typeof onFinish === 'function' ? onFinish() : null
  },
}
