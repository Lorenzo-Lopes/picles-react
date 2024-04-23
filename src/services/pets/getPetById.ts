import { IPet } from "../../interfaces/pet";
import httpClient from "../api/httpClient";

export async function getPetByID(id: string): Promise<IPet> {
  try {
    const response = await httpClient.get(`/pet/${id}`);
    return response.data;
  } catch (error) {
    console.error("error ao buscar pet");
    throw error;
  }
}
