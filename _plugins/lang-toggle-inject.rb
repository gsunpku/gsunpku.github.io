# Inject language toggle script into all pages
Jekyll::Hooks.register :pages, :post_render do |page|
  if page.output && page.output.include?("</body>")
    script_tag = '<script src="' + (page.site.config["baseurl"] || "") + '/assets/js/lang-toggle.js"></script>'
    page.output = page.output.sub("</body>", "#{script_tag}\n</body>")
  end
end

Jekyll::Hooks.register :documents, :post_render do |document|
  if document.output && document.output.include?("</body>")
    script_tag = '<script src="' + (document.site.config["baseurl"] || "") + '/assets/js/lang-toggle.js"></script>'
    document.output = document.output.sub("</body>", "#{script_tag}\n</body>")
  end
end
