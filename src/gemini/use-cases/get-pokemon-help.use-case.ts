import { GoogleGenAI } from '@google/genai';
import { PokemonHelperDto } from '../dtos/pokemon-helper.dto';

export interface PokemonResponse {
  [pokemonId: string]: string;
}

export const getPokemonHelpUseCase = async (
  ai: GoogleGenAI,
  pokemonHelperDto: PokemonHelperDto,
) => {
  const { name } = pokemonHelperDto;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: `The pokemon to defeat is ${name}`,
    config: {
      responseMimeType: 'application/json',
      systemInstruction: `You are a Pokedex that gives recommendations of Pokémon to fight against other Pokémon.
        Respond in JSON, with the ID of the Pokémon and a super effective move against the given Pokémon.
        Always respond with 4 Pokémon.
        This is the response format:
        {
          1: 'tackle',
          20: 'quick-attack',
          23: 'thunderbolt',
          25: 'thunder'
        }
        
        Only return the JSON object, do not provide explanations or anything else.`,
    },
  });

  // return response.text;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const jsonResponse = JSON.parse(response.text ?? '{}');
  return jsonResponse as PokemonResponse;
};
