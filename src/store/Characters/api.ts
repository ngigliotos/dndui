const DIRECTORY = "./saved/characters";
const fs = window.require("fs");

export const getCharacters = async () => {
  let characters: ICharacter[] = [];
  let filenames = fs.readdirSync(DIRECTORY);
  filenames.forEach((file: string) => {
    let fileData: ICharacter = JSON.parse(
      fs.readFileSync(`${DIRECTORY}/${file}`, {
        encoding: "utf-8",
        flag: "r",
      })
    );
    characters.push(fileData);
  });
  return characters as ICharacter[];
};
