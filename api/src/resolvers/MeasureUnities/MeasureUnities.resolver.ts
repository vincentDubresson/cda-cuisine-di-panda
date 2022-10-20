import { Query, Resolver } from "type-graphql";
import MeasureUnity from "../../models/MeasureUnities/MeasureUnity.entity";
import MeasureUnityRepository from "../../models/MeasureUnities/MeasureUnity.repository";

@Resolver(MeasureUnity)
export default class MeasureUnityResolver {
  @Query(() => [MeasureUnity])
  measureUnities(): Promise<MeasureUnity[]> {
    return MeasureUnityRepository.getMeasureUnities();
  }
}