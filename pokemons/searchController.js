const searchPokemon = async (req, res) => {
  const filters = req.query.filter;
  const filter = Object.keys(filters)[0];

  if (filter === "name") {
    const pokemon = await filterBy(`pokemon/${filters[filter]}`);

    res.status(200).json(pokemon);
  } else {
    const pokemons = await filterBy(`${filter}/${filters[filter]}`);

    res.status(200).json(pokemons);
  }

  return res.status(200);
};

const filterBy = async (filterPath) => {
  const request = await fetch(`https://pokeapi.co/api/v2/${filterPath}`);
  const result = await request.json();

  return result;
};

module.exports = {
  searchPokemon,
};
