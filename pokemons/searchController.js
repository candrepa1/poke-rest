const searchPokemon = async (req, res) => {
  const filters = req.query.filter;
  const filter = Object.keys(filters)[0];

  if (filter === "name") {
    const pokemon = await filterByName(filters[filter]);

    res.status(200).json(pokemon);
  } else if (filter === "type") {
    const pokemons = await filterByType(filters[filter]);

    res.status(200).json(pokemons);
  } else if (filter === "ability") {
    const pokemons = await filterByAbility(filters[filter]);

    res.status(200).json(pokemons);
  } else if (filter === "stat") {
    const pokemons = await filterByStat(filters[filter]);

    res.status(200).json(pokemons);
  }

  return res.status(200);
};

const filterByName = async (name) => {
  const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const result = await request.json();

  return result;
};

const filterByAbility = async (ability) => {
  const request = await fetch(`https://pokeapi.co/api/v2/ability/${ability}`);
  const result = await request.json();

  return result;
};

const filterByType = async (type) => {
  const request = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const result = await request.json();

  return result;
};

const filterByStat = async (stat) => {
  const request = await fetch(`https://pokeapi.co/api/v2/stat/${stat}`);
  const result = await request.json();

  return result;
};

module.exports = {
  searchPokemon,
};
