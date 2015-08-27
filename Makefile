template-update:
	cd generators/app/templates

	# Xcode replace '_' to '-' for Bundle Identifier
	mffr -f PROJECT_NAME "<%= projectName %>"
	mffr -f PROJECT-NAME "<%= projectName %>"
	mffr -f ORGANIZATION_NAME "<%= organizationName %>"
	mffr -f ORGANIZATION-ID "<%= organizationId %>"
template-revert:
	cd generators/app/templates
	mffr -f "<%= projectName %>" PROJECT_NAME
	mffr -f "<%= organizationName %>" ORGANIZATION_NAME 
	mffr -f "<%= organizationId %>" ORGANIZATION-ID

.PHONY: template-update template-revert
