import { IBicycle } from "./bicycle.interface";
import Bicycle from "./bicycle.model";

const createUser = async (payload: IBicycle): Promise<IBicycle> => {
  const result = await Bicycle.create(payload);
  return result;
};
const getBicycle = async () => {
  const result = await Bicycle.find();
  return result;
};
const getSingleBicycle = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};
const updateBicycle = async (id: string, data: IBicycle) => {
  const result = await Bicycle.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const deleteBicycle = async (id: string) => {
  const result = await Bicycle.findByIdAndDelete(id);
  return result;
};
export const bicycleService = {
  createUser,
  getBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
