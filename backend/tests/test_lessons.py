def test_list_lessons_empty(client):
    response = client.get("/api/lessons/")
    assert response.status_code == 200
    assert response.json() == []


def test_list_lessons_with_data(client, sample_topic):
    response = client.get("/api/lessons/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "Test Lesson"


def test_filter_lessons_by_topic(client, sample_topic):
    response = client.get(f"/api/lessons/?topic_id={sample_topic.id}")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_get_lesson_not_found(client):
    response = client.get("/api/lessons/99999")
    assert response.status_code == 404
