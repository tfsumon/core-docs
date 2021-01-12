var indexURL = "{{ `index.json` | absLangURL }}";
var baseurl = "{{ site.BaseURL | safeJS }}{{ if site.IsMultiLingual }}{{ site.LanguagePrefix | safeJS }}{{ end }}";
