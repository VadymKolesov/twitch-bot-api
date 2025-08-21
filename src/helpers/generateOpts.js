const generateOpts = (name, token) => {
  return {
    identity: {
      username: name,
      password: `oauth:${token}`,
    },
    channels: ["neastyfy"],
  };
};

export default generateOpts;
