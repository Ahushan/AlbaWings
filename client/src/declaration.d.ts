// Stylesheets
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

// Images
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.webp";
declare module "*.avif";
declare module "*.ico";
declare module "*.bmp";
declare module "*.svg";

// Fonts
declare module "*.woff";
declare module "*.woff2";
declare module "*.eot";
declare module "*.ttf";
declare module "*.otf";
