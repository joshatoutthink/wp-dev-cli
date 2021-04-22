// import { writeFile } from "fs/promises";

// /* Single FIle */
// export type SingleFileArgs = {
//   template: "pluginCoreClass";
//   destination: string;
//   data: Record<string, any>;
// };
// export async function singleFileTemplate({
//   template,
//   data,
//   destination,
// }: SingleFileArgs) {
//   const content = sampleTemplates[template](data);
//   await writeFile(destination, content, { encoding: "utf-8" });
// }
// singleFileTemplate({
//   data: {
//     pluginName: "hey you",
//   },
//   template: "pluginCoreClass",
//   destination: "./class-plugin.php",
// });

// /* Directory */
