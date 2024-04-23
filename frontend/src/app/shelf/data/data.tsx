import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const categories = [
  {
    value: "Category1",
    label: "Category1",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Category2",
    label: "Category2",
    icon: CircleIcon,
  },
  {
    value: "Category3",
    label: "Category3",
    icon: StopwatchIcon,
  },
];

export const tags = [
  {
    label: "Tag1",
    value: "Tag1",
    icon: ArrowDownIcon,
  },
  {
    label: "Tag2",
    value: "Tag2",
    icon: ArrowRightIcon,
  },
  {
    label: "Tag3",
    value: "Tag3",
    icon: ArrowUpIcon,
  },
];
