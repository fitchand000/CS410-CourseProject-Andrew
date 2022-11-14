def hello_world(request):
    import metapy
    request_json = request.get_json()
    doc = metapy.index.Document()
    doc.content("hello world")
    return doc.content()