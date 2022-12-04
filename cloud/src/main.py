def hello_world(request):
    import metapy

    print("type", type(request))
    print(request)

    request_json = request.get_json()
    print("Request Json", request_json)

    if request_json is None or 'search_query' not in request_json or "doc_text" not in request_json:
        print("invalid request")
        return 'invalid request'

    search_query = request_json['search_query']
    doc_text = request_json['doc_text']
    print(search_query)
    print(doc_text)
    #     doc = metapy.index.Document()
    #     doc.content("hello world")
    return search_query