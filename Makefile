build:
	docker build -t vg-frontend .

run:
	docker run -i -d -p 3000:3000 vg-frontend