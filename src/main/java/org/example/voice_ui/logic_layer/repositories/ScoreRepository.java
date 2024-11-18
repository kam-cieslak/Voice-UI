package org.example.voice_ui.logic_layer.repositories;

import org.bson.types.ObjectId;
import org.example.voice_ui.document.Score;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ScoreRepository extends MongoRepository<Score, ObjectId> {
    List<Score> findAllByLoginOrderByScoreDesc(String login);
    Page<Score> findAll(Pageable pageable);
    void deleteAllByLogin(String login);
    Boolean existsByScoreGreaterThanAndLogin(Integer score, String login);
}
