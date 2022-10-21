import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Origin from "../../models/Origins/Origin.entity";
import OriginRepository from "../../models/Origins/Origin.repository";
import { OriginCreateArgs, OriginUpdateArgs } from "./Origins.args";

@Resolver(Origin)
export default class OriginResolver {
  @Query(() => [Origin])
  origins(): Promise<Origin[]> {
    return OriginRepository.getOrigins();
  }

  @Query(() => Origin)
  origin(@Arg("id") id: number): Promise<Origin | null> {
    return OriginRepository.getOriginById(id);
  }

  @Query(() => Origin)
  originBySlug(@Arg("slug") slug: string): Promise<Origin | null> {
    return OriginRepository.getOriginBySlug(slug);
  }

  @Mutation(() => Origin)
  createOrigin(@Args() { origin }: OriginCreateArgs): Promise<Origin> {
    return OriginRepository.createOrigin(origin);
  }

  @Mutation(() => Origin)
  updateOrigin(@Args() { id, origin }: OriginUpdateArgs): Promise<Origin> {
    return OriginRepository.updateOrigin(id, origin);
  }

  @Mutation(() => Origin)
  deleteOrigin(@Arg("id") id: number): Promise<Origin> {
    return OriginRepository.deleteOrigin(id);
  }
}
