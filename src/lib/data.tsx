import fs from "fs";

const path: string = "../data/data.json";

export const readData = async () => {
    const rawData = await fs.readFileSync(path, "utf-8");
    return JSON.parse(rawData);
};

export const saveData = async (data: object) => {
    const read_data = await readData();
    read_data.push(read_data);

    const str_data = JSON.stringify(read_data);
    await fs.writeFileSync(path, str_data);
}