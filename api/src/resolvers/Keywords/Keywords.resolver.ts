import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Keyword from "../../models/Keywords/Keyword.entity";
import KeywordRepository from "../../models/Keywords/Keyword.repository";
import { CreateKeywordArgs } from "./Keywords.args";

@Resolver(Keyword)
export default class KeywordResolver {
  @Query(() => [Keyword])
  keywords(): Promise<Keyword[]> {
    return KeywordRepository.getKeywords();
  }

  @Query(() => Keyword)
  keyword(@Arg("id") id: number): Promise<Keyword> {
    return KeywordRepository.getKeywordById(id);
  }

  @Query(() => Keyword)
  keywordByName(@Arg("keyword") keyword: string): Promise<Keyword> {
    return KeywordRepository.getKeywordByName(keyword);
  }

  @Mutation(() => Keyword)
  createKeyword(@Args() { keyword }: CreateKeywordArgs): Promise<Keyword> {
    return KeywordRepository.createKeyword(keyword);
  }

  @Mutation(() => Keyword)
  deleteKeyword(@Arg("id") id: number): Promise<Keyword> {
    return KeywordRepository.deleteKeyword(id);
  }
}
