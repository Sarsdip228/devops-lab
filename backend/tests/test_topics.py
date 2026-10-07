def test_list_topics_empty(client):
    """Пустая БД — пустой список."""
    response = client.get("/api/topics/")
    assert response.status_code == 200
    assert response.json() == []


def test_list_topics_with_data(client, sample_topic):
    """С одной темой — список из одного элемента."""
    response = client.get("/api/topics/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Topic"


def test_get_topic(client, sample_topic):
    """Получение темы по id."""
    response = client.get(f"/api/topics/{sample_topic.id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Topic"
    assert len(data["lessons"]) == 1
    assert len(data["commands"]) == 1


def test_get_topic_not_found(client):
    """Несуществующая тема — 404."""
    response = client.get("/api/topics/99999")
    assert response.status_code == 404


def test_create_topic(client):
    """Создание темы через POST."""
    payload = {
        "title": "New Topic",
        "description": "New description",
        "icon": "🆕",
        "difficulty": "intermediate",
    }
    response = client.post("/api/topics/", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "New Topic"
    assert data["id"] > 0


def test_create_topic_invalid(client):
    """POST без title — 422."""
    response = client.post("/api/topics/", json={"description": "no title"})
    assert response.status_code == 422
