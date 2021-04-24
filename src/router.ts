import { routes } from "./routes";
export default function router({
  route,
  command,
  options,
}: {
  route: string;
  command: string;
  options: { option: string; value: boolean | number | string }[];
}) {
  if (!(route in routes)) {
    console.log("not a valid route");
    return;
  }

  const selectedRoute = routes[route];

  if (!selectedRoute[command]) {
    console.log("that command does not exist on that route");
    return;
  }

  const selectedCommand = selectedRoute[command];

  selectedCommand(options);
}
