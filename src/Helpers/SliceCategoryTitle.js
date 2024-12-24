export default function SliceCategoryTitle2(title, end) {
  return title.length > 15 ? title.slice(0, end) + "..." : title;
}
