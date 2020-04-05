const api = {
  sendRequest: async (
    url,
    data,
    type,
    appKey,
    specifyContentType = true,
    stringifyBody = true,
  ) => {
    const options = {};
    options.method = type;
    options.headers = {};

    if (specifyContentType) {
      options.headers['Accept'] = 'application/json';
      options.headers['Content-Type'] = 'application/json';
    }
    options.headers['key'] = appKey;

    if (type === 'POST' || type === 'PUT') {
      if (stringifyBody) {
        options.body = {};
        if (data) {
          options.body = JSON.stringify(data);
        }
      } else {
        options.body = data;
      }
    }
    console.log(url);
    try {
      const rawResult = await fetch(url, options);
      const result = await rawResult.json();

      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  },
};

export default api;
