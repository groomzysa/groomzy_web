import { Category, Service } from "api/generated/graphqlTypes";

export interface IServiceProps {
  service: Service;
  category: Category;
  className?: string;
}
