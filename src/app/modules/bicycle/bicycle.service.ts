import QueryBuilder from '../../builder/querybuilder';
import { IBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycle = async (payload: IBicycle): Promise<IBicycle> => {
  const result = await Bicycle.create(payload);
  return result;
};
const getBicycle = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'brand'];
  const biCycles = new QueryBuilder(Bicycle.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await biCycles.modelQuery;
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
  createBicycle,
  getBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
