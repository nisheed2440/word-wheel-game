// A route that takes in a list of words that are base64 encoded and returns a list of hints for each word as an array

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ w: string }> }
) {
  try {
    const { w } = await params;
    console.log(w);
    // Decode the base64 encoded words (pipe-separated)
    const decodedWords = Buffer.from(w, "base64").toString();
    const words = decodedWords.split("|").filter((word) => word.trim() !== "");

    console.log(decodedWords);
    // Get hints for each word
    const hints = await Promise.all<string>(
      words.map(async (word: string) => {
        try {
          // Call dictionary API to get word definition
          const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
          );

          if (response.data && response.data[0]?.meanings) {
            // Get the first definition in the list of definitions as a hint which doesn't include the word itself
            const definition = response.data[0].meanings
              .map((meaning: { definitions: { definition: string }[] }) =>
                meaning.definitions.map(
                  (definition: { definition: string }) => definition.definition
                )
              )
              .find((definition: string) => !definition.includes(word));
            return definition || "";
          }

          return "";
        } catch (e) {
          return "";
        }
      })
    );

    return NextResponse.json({ hints });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process hints" },
      { status: 500 }
    );
  }
}
