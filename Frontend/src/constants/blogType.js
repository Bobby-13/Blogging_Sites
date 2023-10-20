export const BLOG_TYPE = {
  TEXT: "Text",
  PHOTO: "Photo",
  QUOTE: "Quote",
  // LINK: "Link",
  // AUDIO: "Audio",
  VIDEO:"Video",
  MORE: "More",
};

export const BLOG_TYPE_LIST = [
  "Text",
  "Photo",
  "Quote",
  // "Link",
  // "Audio",
  "Video",
  "More",
  "image"
];

export const BLOG_BTN_LIST = [
  {
    id:1,
    type: BLOG_TYPE.TEXT,
    iconClassName: "fa-solid fa-font",
  },
  {
    id:2,
    type: BLOG_TYPE.PHOTO,
    iconClassName: "fa-solid fa-camera",
  },
  {
    id:3,
    type: BLOG_TYPE.QUOTE,
    iconClassName: "fa-solid fa-quote-right",
  },
  // {
  //   id:4,
  //   type: BLOG_TYPE.AUDIO,
  //   iconClassName: "fa-solid fa-headphones",
  // },
  {
    id:4,
    type: BLOG_TYPE.VIDEO,
    iconClassName: "fa-solid fa-video",
  },
  {
    id:5,
    type: BLOG_TYPE.MORE,
    iconClassName: "fa-solid fa-ellipsis",
  },
]