// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  	production: false,
	clientId: "749163791699-p2t702fkttdn0a8i8lpfims4okri91rt.apps.googleusercontent.com",
	scope: "profile",
	apiKey: "AIzaSyDVWjvJ9G6yjhhn51Flrdg-CveGD_mN_no",
	ocrApiKey: "aca46c6b6288957",
	altntOcrApiKey: "275664f25e88957", // If the above key is not working then use this key for OCR.
	language: "eng",
	scale: "true",

	sslc_cer_conf: "REGISTER NO",
	hsc_cer_conf: "REGISTER NO",
	aadhaar_cer_conf: "Your Aadhaar No",
	deg_cer_conf: "DATE OF PUBLICATION",
	pan_cer_conf: "Permanent Account Number",

	sscl_doc_conf: "SECONDARY SCHOOL LEAVING CERTIFICATE",
	hsc_doc_conf: "HIGHER SECONDARY COURSE CERTIFICATE",
	aadhaar_doc_conf: "Your Aadhaar No",
	pan_doc_conf: "INCOME TAX",
	successMsg: "Document successfully uploaded.",
	errorMsg: "Uploaded file was not a {{docType}} document. Please cross check before upload."
};
