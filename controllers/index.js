// import { OpenAI } from "openai";

// const openai = new OpenAI({
//     apiKey: "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",
// });

// const chatGptExecute= async (userQuery) => {
//     const completion = await openai.chat.completions.create({
//         model: "ft:gpt-3.5-turbo-0125:personal::9VDkIHDS:ckpt-step-80",
//         messages: [
//             {
//                 "role": "system",
//                 "content": [
//                     {
//                         "type": "text",
//                         "text": "You are an AI assistant that helps in converting a natural language list of items into a structured JSON format. Given an input text that describes an order of products and their quantities, you should output a JSON array where each object contains the product name and its quantity. If the quantity is not mentioned, assume it to be 1."
//                     }
//                 ]
//             },
//             {
//                 "role": "user",
//                 "content": [
//                     {
//                         "type": "text",
//                         "text": userQuery
//                     }
//                 ]
//             }
//         ]
//     });

//     if (completion.choices.length > 0) {
//         const actualResult = JSON.parse(completion.choices[0].message.content);
//         console.log(actualResult);
//     } else {
//         console.log("No response from the model.");
//     }
// }

chatGptExecute("frooti 4  oranges nimbooz 2 on 8755273773");


