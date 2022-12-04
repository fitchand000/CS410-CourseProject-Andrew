gcloud functions deploy search-bm25 \
--region=us-central1 \
--runtime=python37 \
--project=cs-410-project \
--source=src \
--entry-point=hello_world \
--trigger-http