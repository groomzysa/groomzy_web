import { Category, Service } from "api/generated/schema";

export interface IServiceProps {
  service: Service;
  category: Category;
  className?: string;
}
