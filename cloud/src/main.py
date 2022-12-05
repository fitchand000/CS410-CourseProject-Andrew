def rank_documents(request):
    from rank_bm25 import BM25Okapi
    import re

    # validate the request json
    request_json = request.get_json()
    if request_json is None or 'search_query' not in request_json or "doc_text" not in request_json:
        print("invalid request")
        return 'invalid request'

    # Get search input
    search_query = request_json['search_query']
    doc_text = request_json['doc_text']

    # build corpus from input doc_text
    corpus = list(filter(lambda d: d, re.split('\\n', doc_text)))

    # tokenize the corpus and search query, converting strings to lower case
    tokenized_corpus = [list(map(lambda m: m.lower(), filter(lambda s: s, doc.split(" ")))) for doc in corpus]
    tokenized_query = list(map(lambda t: t.lower(), search_query.split(" ")))

    # rank documents and return top 5 results
    bm25 = BM25Okapi(tokenized_corpus)
    ranked_documents =  bm25.get_top_n(tokenized_query, corpus, n=5)
    print("Ranked documents", ranked_documents)
    return {'result': ranked_documents}