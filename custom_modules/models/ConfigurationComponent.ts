import { BlockCode } from "./BlockCode";
import { ComponentOption } from "./ComponentOption";

export interface ConfigurationComponent {
  acessCode: string,
  name: string,
  link: string,
  description: string,
  selectedOptionId: number,
  options: ComponentOption[]
  blockers: string[],
  blockedBy: BlockCode[]
}
