def test_list_commands_empty(client):
    response = client.get("/api/commands/")
    assert response.status_code == 200
    assert response.json() == []


def test_list_commands_with_data(client, sample_topic):
    response = client.get("/api/commands/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "test-cmd"


def test_search_commands(client, sample_topic):
    """Поиск по имени работает."""
    response = client.get("/api/commands/?search=test")
    assert response.status_code == 200
    assert len(response.json()) == 1

    response = client.get("/api/commands/?search=nomatch")
    assert response.status_code == 200
    assert len(response.json()) == 0


def test_filter_by_topic(client, sample_topic):
    response = client.get(f"/api/commands/?topic_id={sample_topic.id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_command_not_found(client):
    response = client.get("/api/commands/99999")
    assert response.status_code == 404
