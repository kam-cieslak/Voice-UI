package org.example.voice_ui.logic_layer.services;

import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.example.voice_ui.document.Score;
import org.example.voice_ui.logic_layer.repositories.AccountRepository;
import org.example.voice_ui.logic_layer.repositories.ScoreRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreService {
    private final ScoreRepository scoreRepository;

    public Score getScoreByAccount(String login) {
        return scoreRepository.findAllByLoginAndScoreDesc(login)
                .stream()
                .findFirst()
                .orElse(null);
    }

    public void addScore(Score score) {
        if(!scoreRepository.existsByScoreGreaterThanAndLogin(score.getScore(),score.getLogin())){
            scoreRepository.save(score);
        }
    }

    public List<Score> getLeaderboard() {
        return scoreRepository.findAllOrderByScoreDesc(PageRequest.of(0, 10)).
                getContent();
    }
}
