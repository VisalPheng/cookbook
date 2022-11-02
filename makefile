IMAGE_NAME=samdyvin/ultimate-react-template

build-image:
	docker build -t ${IMAGE_NAME} -f Dockerfile .

run-image:
	docker run -p 3000:80 ${IMAGE_NAME}

push-image:
	docker push ${IMAGE_NAME}

start-image:
	make build
	make run