def test_root(client):
    """GET / возвращает приветствие."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "DevOps" in data["message"]


def test_health(client):
    """GET /api/health возвращает ok."""
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
