build:
	docker build -t vg-backend .

run:
	docker run -d -p 5000:5000 vg-backend