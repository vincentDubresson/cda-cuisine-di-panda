import { Request, Response } from "express";
import KeywordRepository from "../models/Keywords/Keyword.repository";
import { getErrorMessage } from "../utils";

export const get = async (req: Request, res: Response): Promise<void> => {
  const keywords = await KeywordRepository.getKeywords();
  res.json(keywords);
};

export const getBySlug = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params;
  try {
    const ingredientType =
      await KeywordRepository.getKeywordBySlug(slug);
    res.status(201).json(ingredientType);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
};

export const post = async (req: Request, res: Response): Promise<void> => {
  const { keywords } = req.body;
  for (const keyword of keywords) {
    if (!keyword.trim()) {
      res
        .status(400)
        .json({ error: "Le champ 'keyword' est obligatoire." });
      } else {
      try {
        const newKeyword =
          await KeywordRepository.createKeyword(keyword);
        
      } catch (error) {
        res.status(404).json({ error: getErrorMessage(error) });
      }
    }
  };
  res.status(201).json({ keywords: keywords });
};

export const put = async (req: Request, res: Response): Promise<void> => {};

export const del = async (req: Request, res: Response): Promise<void> => {};
