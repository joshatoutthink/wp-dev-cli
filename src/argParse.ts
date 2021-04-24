import type { OptionsType } from "./types";
const booleanArgs = ["--verbose", "-v"];
export function argParse() {
  const rawArgs = sliceTwo(process.argv);
  console.log(rawArgs);
  const [_route, _command] = rawArgs;

  const [route, command] = checkPrefixCommand(_route, _command);
  const optionsAndValues = sliceTwo(rawArgs);
  const options = combineOptions(optionsAndValues);
  return {
    route,
    command,
    options,
  };
}

function combineOptions(args: (string | number)[]): OptionsType {
  return args.reduce((list: OptionsType, arg) => {
    const previousObject = list[list.length - 1];

    //immediately putting number as the value of last object since number cant be option name
    if (isNumber(arg)) {
      if (previousObject?.value == "") {
        setPrevObj(list, "value", arg);
      }
      // we are going to skip the number if the prev object value was defined as this was a mistake
      console.log(
        "hey you passed in a number where there should not have been we just skipped it."
      );
      return list;
    }

    const stringArg = isString(arg); //only strings from now on

    //Deal with boolean options (options with no value needed)
    const booleanOption = isBooleanArg(stringArg);
    if (booleanOption) {
      list.push({ option: stringArg, value: true });
      return list;
    }

    // its safe to assume if we have a value if theres an object option but no value
    if (previousObject?.option && previousObject?.value == "") {
      setPrevObj(list, "value", stringArg);
      return list;
    }

    //only thing left is setting the option
    list.push({ option: stringArg, value: "" });
    return list;
  }, []);
}

function isNumber(arg: string | number) {
  return typeof arg == "number" && (arg as number);
}

function isString(arg: string | number) {
  if (typeof arg == "string") {
    return arg as string;
  } else {
    throw new TypeError(
      "hmmm something has gone wrong with isNumber letting things through"
    );
  }
}

function isBooleanArg(arg: string) {
  return booleanArgs.includes(arg);
}

function sliceTwo(list: (string | number)[]) {
  return list.slice(2);
}

function checkPrefixCommand(route: string | number, command: string | number) {
  if (typeof route !== "string" || typeof command !== "string") {
    throw new TypeError(`${route}, and ${command} both need to be strings`);
  }
  return [route as string, command as string];
}

function setPrevObj(list: any[], key: string, value: any) {
  //!mutates in place
  list[list.length - 1][key] = value;
}
