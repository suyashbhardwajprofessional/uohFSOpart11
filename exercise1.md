Java:

lint:
build: 						maven(Java) / Gradle(*) / Make(C/C++) / Jenkins / TravisCI
test:						Jenkins / TravisCI
VCS: 						git(speed & robust branching) / svn(strong binary files support) / Mercurial / Perforce
versioning strategy:		semantic(Major.Minor.Patch) / custom
workflow:					gitflow (feature/release/fixes branches)/ github_flow (cont. delivery specific) / custom
build automation			Jenkins / TravisCI
deployment					Jenkins
artifact repository			Docker / Amazon ECR store
deployment strategies		blue-green (identical environments one for production, other for updation/testing)
monitoring & feedback loop	Prometheus / Grafana


automated-testing		unit-tests + integration-tests + end-to-end tests

___________________
Jenkins: highly customizable
Travis CI: popular among open-source projects