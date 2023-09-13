import { ConfigurationComponent } from "./ConfigurationComponent";

export interface PickerConfiguration {
  clientName: string,
  basePrice: number,
  components: ConfigurationComponent[]
}
