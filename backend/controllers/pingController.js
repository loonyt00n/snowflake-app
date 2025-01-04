const getPing = async (req, res) => {
  try {
    res.send('Ping Response ' + Date.UTC)
  } catch (error) {
    console.error(error);
    res.status(500).send('Error in Ping');
  }
};

module.exports = { getPing };
