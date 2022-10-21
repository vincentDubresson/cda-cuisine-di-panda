import { Query, Resolver } from "type-graphql";
import Rate from "../../models/Rates/Rate.entity";
import RateRepository from "../../models/Rates/Rate.repository";

@Resolver(Rate)
export default class RateResolver {
  @Query(() => [Rate])
  rates(): Promise<Rate[]> {
    return RateRepository.getRates();
  }
}
