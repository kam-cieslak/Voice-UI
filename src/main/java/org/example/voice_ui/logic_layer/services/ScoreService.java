package org.example.voice_ui.logic_layer.services;

import lombok.RequiredArgsConstructor;
import org.example.voice_ui.document.Score;
import org.example.voice_ui.logic_layer.repositories.ScoreRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScoreService {
    private final ScoreRepository scoreRepository;

    public Score getScoreByAccount(String login) {
        return scoreRepository.findAllByLoginOrderByScoreDesc(login)
                .stream()
                .findFirst()
                .orElse(null);
    }

    public void addScore(Score score) {
        if(!scoreRepository.existsByScoreGreaterThanAndLogin(score.getScore(),score.getLogin())){
            scoreRepository.deleteAllByLogin(score.getLogin());
            scoreRepository.save(score);
        }
    }

    public List<Score> getLeaderboard() {
        return scoreRepository.findAll(PageRequest.of(0, 10, Sort.by("score").descending())).
                getContent();
    }
}
