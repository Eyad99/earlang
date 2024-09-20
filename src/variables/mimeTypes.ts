import powerPointIcon from "@/assets/img/others/powerpoint.png";
import defaultImage from "@/assets/img/others/default-image.png";
import excelIcon from "@/assets/img/others/excel.png";
import videoIcon from "@/assets/img/others/multimedia.png";
import audioIcon from "@/assets/img/others/sound.png";
import fileIcon from "@/assets/img/others/file.png";
import wordIcon from "@/assets/img/others/word.png";
import pdfIcon from "@/assets/img/others/pdf.png";
import zipIcon from "@/assets/img/others/zip.png";

const imageTypes = [
	"image/jpg",
	"image/jpeg",
	"image/jfif",
	"image/jif",
	"image/jpe",
	"image/pjp",
	"image/gif",
	"image/pjpeg",
	"image/gif",
	"image/png",
	"image/svg",
	"image/webp",
	"image/ico",
	"image/avif",
	"image/svg+xml",
];
const fileTypes = [
	"message/rfc822",
	"text/plain",
	"application/vnd.ms-outlook",
	"application/vnd.oasis.opendocument.text",
	"application/vnd.apple.pages",
	"application/rtf",
	"text/plain",
	"application/wordperfect",
	"application/xml",
	"text/xml",
	"audio/wav",
	"video/x-ms-wmv",
	"application/json",
	"text/html",
	"application/x-httpd-php",
	"application/javascript",
	"text/css",
	"application/x-httpd-php",
	"application/xhtml+xml",
	null,
];
const fileExcel = [
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.openxmlformats-officedocument.spre",
	"text/csv",
];
const fileWord = [
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-word",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.openxmlformats-officedocument.word",
];
const filePowerPoint = [
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
const filePdf = ["application/pdf"];
const fileVideo = ["video/mp4", "video/quicktime"];
const fileAudio = ["audio/mpeg", "audio/wav"];
const fileZip = ["application/x-zip-compressed", "application/x-compressed"];

export {
	imageTypes,
	fileTypes,
	fileExcel,
	fileWord,
	filePowerPoint,
	filePdf,
	fileVideo,
	fileAudio,
	fileZip,
	powerPointIcon,
	defaultImage,
	excelIcon,
	videoIcon,
	audioIcon,
	fileIcon,
	wordIcon,
	pdfIcon,
	zipIcon,
};
